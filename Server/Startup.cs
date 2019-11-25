using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Server.Helpers;
using Server.Services.Authorization;
using Server.Services.Configuration;
using Server.Services.Contexts;
using Server.Services.Mapping;
using Server.Services.Repositories;

namespace Server
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.AddSingleton<IUsersRepository, UsersRepository>();
            services.AddSingleton<IBlobStorageService,BlobStorageService>();

            services.AddTransient<IMapService, MapService>();
            services.AddTransient<IAuthService, AuthService>();
            services.AddTransient<IConfigurationService, ConfigurationService>();
            services.AddTransient<ITokenService,TokenService>();

            services.AddDistributedRedisCache(options =>
            {
                options.Configuration = Configuration["Redis:Domain"];
                options.InstanceName = Configuration["Redis:InstanceName"];
            });

            services.AddJwtAuthorization(Configuration);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseCors(options => options
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}