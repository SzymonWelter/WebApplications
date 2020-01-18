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
using Microsoft.OpenApi.Models;
using Server.DAO;
using Microsoft.EntityFrameworkCore;
using Server.Services;
using System;

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

            services.AddScoped<IUsersRepository, UsersRepository>();
            services.AddScoped<IFilesRepository, FilesRepository>();
            services.AddSingleton<IBlobStorageService,BlobStorageService>();

            services.AddTransient<IMapService, MapService>();
            services.AddTransient<IUserService,UserService>();
            services.AddTransient<IAuthService, AuthService>();
            services.AddTransient<ITokenService,TokenService>();
            services.AddTransient<IFilesService, FilesService>();
            services.AddTransient<IConfigurationService, ConfigurationService>();

            services.AddDbContext<WebAppContext>(options => options.UseSqlServer(Configuration["Database:ConnectionString"]));

            services.AddStackExchangeRedisCache(options =>
            {
                options.Configuration = Configuration["Redis:ConnectionString"];
            });

            services.AddJwtAuthorization(Configuration);
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "szw-web-server api", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseSwagger();

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