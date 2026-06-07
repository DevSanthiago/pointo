using MediatR;
using PointO.Application.Common.Interfaces;
using PointO.Application.DTOs;

namespace PointO.Application.Registros.Queries.GetRegistrosByDate;

public sealed class GetRegistrosByDateQueryHandler(IRegistroRepository repository, ICurrentUser currentUser)
    : IRequestHandler<GetRegistrosByDateQuery, IEnumerable<RegistroDto>>
{
    public async Task<IEnumerable<RegistroDto>> Handle(GetRegistrosByDateQuery request, CancellationToken ct)
    {
        var registros = await repository.ObterPorDataAsync(currentUser.Id, request.Data, ct);
        return registros.Select(r => r.ToDto());
    }
}
