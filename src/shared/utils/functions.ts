export function validateCPF(cpf: string): boolean {
  if (/[^\d]/.test(cpf)) return false; // Reject CPF with dots, dashes, or any non-digit characters
  if (cpf === '') return false;
  // Eliminate known invalid CPFs
  if (
    cpf.length !== 11 ||
    cpf === '00000000000' ||
    cpf === '11111111111' ||
    cpf === '22222222222' ||
    cpf === '33333333333' ||
    cpf === '44444444444' ||
    cpf === '55555555555' ||
    cpf === '66666666666' ||
    cpf === '77777777777' ||
    cpf === '88888888888' ||
    cpf === '99999999999'
  )
    return false;
  // Validate 1st digit
  let add = 0;
  for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
  let rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf.charAt(9))) return false;
  // Validate 2nd digit
  add = 0;
  for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
  rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf.charAt(10))) return false;
  return true;
}

export function validateCNPJ(cnpj: string): boolean {
  if (/[^\d]/.test(cnpj)) return false; // Reject CNPJ with dots, dashes, slashes, or any non-digit characters

  if (cnpj === '') return false;

  if (cnpj.length !== 14) return false;

  // Eliminate known invalid CNPJs
  if (
    cnpj === '00000000000000' ||
    cnpj === '11111111111111' ||
    cnpj === '22222222222222' ||
    cnpj === '33333333333333' ||
    cnpj === '44444444444444' ||
    cnpj === '55555555555555' ||
    cnpj === '66666666666666' ||
    cnpj === '77777777777777' ||
    cnpj === '88888888888888' ||
    cnpj === '99999999999999'
  )
    return false;

  // Validate DVs
  let size = cnpj.length - 2;
  let numbers = cnpj.substring(0, size);
  const digitos = cnpj.substring(size);
  let sum = 0;
  let pos = size - 7;
  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digitos.charAt(0))) return false;

  size = size + 1;
  numbers = cnpj.substring(0, size);
  sum = 0;
  pos = size - 7;
  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digitos.charAt(1))) return false;

  return true;
}

export function checkForDuplicates(data: { cultureIds: string[] }): string {
  if (!data || !Array.isArray(data.cultureIds)) {
    return "Error: 'cultureIds' is missing or not an array.";
  }

  const seen = new Set<string>();

  for (const id of data.cultureIds) {
    if (seen.has(id)) {
      return `Error: the value '${id}' is duplicated and does not match the cultural rules.`;
    }
    seen.add(id);
  }

  return "Valid: no duplicates in cultureIds.";
}

export function isInvalidBrazilianState(sigla: string): boolean {
  const estados = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
    'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
    'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
  ];

  return !estados.includes(sigla.toUpperCase());
}

