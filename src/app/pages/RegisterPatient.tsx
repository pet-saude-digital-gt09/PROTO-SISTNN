import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function RegisterPatient() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    rnName: '',
    cns: '',
    dob: '',
    weight: '',
    isPremature: 'no',
    motherName: '',
    motherDOB: '',
    motherRace: '',
    fatherName: '',
    fatherDOB: '',
    fatherRace: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Paciente registrado com sucesso!');
    navigate('/sample-collection');
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-5xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Newborn Data */}
        <Card>
          <CardHeader>
            <CardTitle>Dados do Recém-nascido</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rnName">Nome do Recém-nascido *</Label>
              <Input
                id="rnName"
                value={formData.rnName}
                onChange={(e) => handleChange('rnName', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cns">Número do CNS *</Label>
              <Input
                id="cns"
                value={formData.cns}
                onChange={(e) => handleChange('cns', e.target.value)}
                placeholder="15 dígitos"
                maxLength={15}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dob">Data de Nascimento *</Label>
              <Input
                id="dob"
                type="date"
                value={formData.dob}
                onChange={(e) => handleChange('dob', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">Peso (gramas) *</Label>
              <Input
                id="weight"
                type="number"
                value={formData.weight}
                onChange={(e) => handleChange('weight', e.target.value)}
                placeholder="ex:, 3200"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="isPremature">Nascimento Prematuro *</Label>
              <Select value={formData.isPremature} onValueChange={(value: string) => handleChange('isPremature', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no">Não</SelectItem>
                  <SelectItem value="yes">Sim</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Parents Data */}
        <Card>
          <CardHeader>
            <CardTitle>Dados dos Pais</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="motherName">Nome da Mãe *</Label>
              <Input
                id="motherName"
                value={formData.motherName}
                onChange={(e) => handleChange('motherName', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="motherDOB">Data de Nascimento da Mãe *</Label>
              <Input
                id="motherDOB"
                type="date"
                value={formData.motherDOB}
                onChange={(e) => handleChange('motherDOB', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="motherRace">Raça/Etnia da Mãe *</Label>
              <Select value={formData.motherRace} onValueChange={(value: string) => handleChange('motherRace', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="branca">Branca</SelectItem>
                  <SelectItem value="parda">Parda</SelectItem>
                  <SelectItem value="negra">Negra</SelectItem>
                  <SelectItem value="amarela">Amarela</SelectItem>
                  <SelectItem value="indigena">Indígena</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fatherName">Nome do Pai</Label>
              <Input
                id="fatherName"
                value={formData.fatherName}
                onChange={(e) => handleChange('fatherName', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fatherDOB">Data de Nacimento do Pai</Label>
              <Input
                id="fatherDOB"
                type="date"
                value={formData.fatherDOB}
                onChange={(e) => handleChange('fatherDOB', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fatherRace">Raça/Etnia do Pai</Label>
              <Select value={formData.fatherRace} onValueChange={(value: string) => handleChange('fatherRace', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="branca">Branca</SelectItem>
                  <SelectItem value="parda">Parda</SelectItem>
                  <SelectItem value="negra">Negra</SelectItem>
                  <SelectItem value="amarela">Amarela</SelectItem>
                  <SelectItem value="indigena">Indígena</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Address Details */}
        <Card>
          <CardHeader>
            <CardTitle>Detalhes do Endereço</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Endereço Residencial *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">Cidade *</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleChange('city', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">Estado *</Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) => handleChange('state', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="zipCode">CEP *</Label>
              <Input
                id="zipCode"
                value={formData.zipCode}
                onChange={(e) => handleChange('zipCode', e.target.value)}
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 -mx-6 -mb-6">
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => navigate('/patient-search')}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              Salvar Registro
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
