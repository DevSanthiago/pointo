FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY src/PointO.Domain/PointO.Domain.csproj src/PointO.Domain/
COPY src/PointO.Application/PointO.Application.csproj src/PointO.Application/
COPY src/PointO.Infrastructure/PointO.Infrastructure.csproj src/PointO.Infrastructure/
COPY src/PointO.API/PointO.API.csproj src/PointO.API/
RUN dotnet restore src/PointO.API/PointO.API.csproj

COPY . .
RUN dotnet publish src/PointO.API/PointO.API.csproj -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
ENV ASPNETCORE_ENVIRONMENT=Production
CMD ASPNETCORE_URLS=http://0.0.0.0:${PORT:-8080} dotnet PointO.API.dll
