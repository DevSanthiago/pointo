using MediatR;
using PointO.Application.DTOs;

namespace PointO.Application.Registros.Commands.CreateRegistro;

public record CreateRegistroCommand(
    string Empresa,
    string Cnpj,
    string Local,
    string NomeFuncionario,
    DateOnly DataPonto,
    TimeOnly HorarioPonto,
    Stream ImagemStream,
    string ImagemNomeArquivo,
    string ImagemContentType
) : IRequest<RegistroDto>;
