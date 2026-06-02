using MediatR;
using Microsoft.AspNetCore.Mvc;
using PointO.API.Models;
using PointO.Application.Registros.Commands.CreateRegistro;
using PointO.Application.Registros.Commands.DeleteRegistro;
using PointO.Application.Registros.Commands.UpdateRegistro;
using PointO.Application.Registros.Queries.GetAllRegistros;
using PointO.Application.Registros.Queries.GetRegistrosByDate;

namespace PointO.API.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public sealed class RegistrosController(IMediator mediator) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] DateOnly? dataInicio,
        [FromQuery] DateOnly? dataFim,
        [FromQuery] string? empresa,
        CancellationToken ct)
    {
        var result = await mediator.Send(new GetAllRegistrosQuery(dataInicio, dataFim, empresa), ct);
        return Ok(result);
    }

    [HttpGet("data/{data}")]
    public async Task<IActionResult> GetByDate(DateOnly data, CancellationToken ct)
    {
        var result = await mediator.Send(new GetRegistrosByDateQuery(data), ct);
        return Ok(result);
    }

    [HttpPost]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> Create([FromForm] CreateRegistroRequest request, CancellationToken ct)
    {
        var command = new CreateRegistroCommand(
            request.Empresa,
            request.Cnpj,
            request.Local,
            request.NomeFuncionario,
            request.DataPonto,
            request.HorarioPonto,
            request.Imagem.OpenReadStream(),
            request.Imagem.FileName,
            request.Imagem.ContentType);

        var result = await mediator.Send(command, ct);
        return Created($"/api/v1/registros/data/{result.DataPonto}", result);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateRegistroRequest request, CancellationToken ct)
    {
        var command = new UpdateRegistroCommand(
            id,
            request.Empresa,
            request.Cnpj,
            request.Local,
            request.NomeFuncionario,
            request.DataPonto,
            request.HorarioPonto);

        var result = await mediator.Send(command, ct);
        return Ok(result);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken ct)
    {
        await mediator.Send(new DeleteRegistroCommand(id), ct);
        return NoContent();
    }
}
