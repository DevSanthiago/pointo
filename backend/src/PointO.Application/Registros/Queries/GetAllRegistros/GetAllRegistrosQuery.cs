using MediatR;
using PointO.Application.DTOs;

namespace PointO.Application.Registros.Queries.GetAllRegistros;

public record GetAllRegistrosQuery(
    DateOnly? DataInicio,
    DateOnly? DataFim,
    string? Empresa,
    int Pagina,
    int TamanhoPagina
) : IRequest<PagedResult<RegistroDto>>;
