export interface IAdress {
  cep: string;         // CEP com formato "00000-000"
  logradouro: string;  // Nome do logradouro
  complemento: string; // Complemento do endereço (opcional)
  unidade: string;     // Unidade do endereço (ex: apartamento)
  bairro: string;      // Nome do bairro
  localidade: string;  // Nome da cidade
  uf: string;          // Sigla da unidade federativa (estado)
  estado: string;      // Nome do estado
  regiao: string;      // Nome da região (opcional)
  ibge: string;        // Código IBGE do município
  gia: string;         // Código GIA (opcional)
  ddd: string;         // Código DDD (opcional)
  siafi: string;       // Código SIAFI (opcional)
}
