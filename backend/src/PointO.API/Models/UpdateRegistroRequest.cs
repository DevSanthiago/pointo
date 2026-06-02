namespace PointO.API.Models;

public record UpdateRegistroRequest(
    string Empresa,
    string Cnpj,
    string Local,
    string NomeFuncionario,
    DateOnly DataPonto,
    TimeOnly HorarioPonto
);
