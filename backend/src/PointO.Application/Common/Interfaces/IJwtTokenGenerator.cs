using PointO.Domain.Entities;

namespace PointO.Application.Common.Interfaces;

public interface IJwtTokenGenerator
{
    string Gerar(Usuario usuario);
}
