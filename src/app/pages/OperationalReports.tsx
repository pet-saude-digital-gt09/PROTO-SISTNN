import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  mockNewborns,
  mockCollectionUnits,
} from "../data/mockData";
import { Download, FileSpreadsheet } from "lucide-react";

export function OperationalReports() {
  const [filters, setFilters] = useState({
    startDate: "2026-03-01",
    endDate: "2026-03-13",
    collectionUnit: "all", // Mudamos o valor inicial vazio para 'all'
    municipality: "all", // Mudamos o valor inicial vazio para 'all'
  });

  const [filteredData, setFilteredData] =
    useState(mockNewborns);

  const handleGenerateReport = () => {
    let filtered = mockNewborns;

    // Atualizamos a lógica para checar se é diferente de 'all'
    if (
      filters.collectionUnit &&
      filters.collectionUnit !== "all"
    ) {
      filtered = filtered.filter(
        (p) => p.collectionUnit === filters.collectionUnit,
      );
    }

    if (
      filters.municipality &&
      filters.municipality !== "all"
    ) {
      filtered = filtered.filter(
        (p) => p.city === filters.municipality,
      );
    }

    // Date filtering would be applied here
    setFilteredData(filtered);
  };

  const exportToExcel = () => {
    alert("Exportando para o Excel... (Ação simulada)");
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros do Relatório</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Data Inicial</Label>
              <Input
                id="startDate"
                type="date"
                value={filters.startDate}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    startDate: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">Data Final</Label>
              <Input
                id="endDate"
                type="date"
                value={filters.endDate}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    endDate: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="collectionUnit">
                Unidade de Coleta
              </Label>
              <Select
                value={filters.collectionUnit}
                onValueChange={(value: string) =>
                  setFilters({
                    ...filters,
                    collectionUnit: value,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Todas as Unidades" />
                </SelectTrigger>
                <SelectContent>
                  {/* CORREÇÃO AQUI: Mudado de value="" para value="all" */}
                  <SelectItem value="all">
                    Todas as Unidades
                  </SelectItem>
                  {mockCollectionUnits.map((unit) => (
                    <SelectItem key={unit.id} value={unit.name}>
                      {unit.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="municipality">Município</Label>
              <Select
                value={filters.municipality}
                onValueChange={(value: string) =>
                  setFilters({
                    ...filters,
                    municipality: value,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Todos os Municípios" />
                </SelectTrigger>
                <SelectContent>
                  {/* CORREÇÃO AQUI: Mudado de value="" para value="all" */}
                  <SelectItem value="all">
                    Todos os Municípios
                  </SelectItem>
                  <SelectItem value="São Paulo">
                    São Paulo
                  </SelectItem>
                  <SelectItem value="Campinas">
                    Campinas
                  </SelectItem>
                  <SelectItem value="Santos">Santos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <Button
              onClick={handleGenerateReport}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Gerar Relatório
            </Button>
            <Button onClick={exportToExcel} variant="outline">
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              Exportar Excel
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exportar PDF
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Relatório Operacional ({filteredData.length}{" "}
            registros)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>Código RN</TableHead>
                  <TableHead>Controle Interno</TableHead>
                  <TableHead>Nome do Paciente</TableHead>
                  <TableHead>Nome da Mãe</TableHead>
                  <TableHead>Data de Nascimento</TableHead>
                  <TableHead>Data de Coleta</TableHead>
                  <TableHead>Unidade de Coleta</TableHead>
                  <TableHead>Município</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell className="font-mono text-sm">
                      {patient.rnCode}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {patient.internalControl || "N/A"}
                    </TableCell>
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>{patient.motherName}</TableCell>
                    <TableCell>
                      {new Date(
                        patient.dateOfBirth,
                      ).toLocaleDateString("pt-BR")}
                    </TableCell>
                    <TableCell>
                      {patient.collectionDate
                        ? new Date(
                            patient.collectionDate,
                          ).toLocaleDateString("pt-BR")
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      {patient.collectionUnit || "N/A"}
                    </TableCell>
                    <TableCell>{patient.city}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          patient.status === "liberated"
                            ? "bg-green-100 text-green-800"
                            : patient.status === "approved"
                              ? "bg-blue-100 text-blue-800"
                              : patient.status === "rejected"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {patient.status
                          .charAt(0)
                          .toUpperCase() +
                          patient.status.slice(1)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Summary Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo Estatístico</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-blue-900">
                {filteredData.length}
              </p>
              <p className="text-sm text-blue-600 mt-1">
                Total de Registros
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-green-900">
                {
                  filteredData.filter(
                    (p) => p.status === "liberated",
                  ).length
                }
              </p>
              <p className="text-sm text-green-600 mt-1">
                Liberados
              </p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-yellow-900">
                {
                  filteredData.filter(
                    (p) => p.status === "pending",
                  ).length
                }
              </p>
              <p className="text-sm text-yellow-600 mt-1">
                Pendentes
              </p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-red-900">
                {
                  filteredData.filter(
                    (p) => p.status === "rejected",
                  ).length
                }
              </p>
              <p className="text-sm text-red-600 mt-1">
                Rejeitados (Recoleta)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}