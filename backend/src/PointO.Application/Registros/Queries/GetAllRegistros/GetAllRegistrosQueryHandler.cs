using MediatR;
using PointO.Application.Common.Interfaces;
using PointO.Application.DTOs;

namespace PointO.Application.Registros.Queries.GetAllRegistros;

public sealed class GetAllRegistrosQueryHandler(IRegistroRepository repository, ICurrentUser currentUser)
    : IRequestHandler<GetAllRegistrosQuery, IEnumerable<RegistroDto>>
{
    public async Task<IEnumerable<RegistroDto>> Handle(GetAllRegistrosQuery request, CancellationToken ct)
    {
        var registros = await repository.ObterTodosAsync(currentUser.Id, request.DataInicio, request.DataFim, request.Empresa, ct);
        return registros.Select(r => r.ToDto());
    }
}
