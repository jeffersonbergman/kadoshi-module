
type SupportedCurrency = 'BRL' | 'USD' | 'EUR' | 'GBP';

interface CurrencyConfig {
  currency: SupportedCurrency;
  symbol: string;
  locale: string;
}

const currencyMap: Record<string, CurrencyConfig> = {
  'pt-BR': { currency: 'BRL', symbol: 'R$', locale: 'pt-BR' },
  'en-US': { currency: 'USD', symbol: '$', locale: 'en-US' },
  'en-GB': { currency: 'GBP', symbol: '£', locale: 'en-GB' },
  'es-ES': { currency: 'EUR', symbol: '€', locale: 'es-ES' },
  'de-DE': { currency: 'EUR', symbol: '€', locale: 'de-DE' },
  'fr-FR': { currency: 'EUR', symbol: '€', locale: 'fr-FR' },
  // Adicione mais conforme necessário
};

// Detecção automática da localidade
export const getLocaleCurrency = (): CurrencyConfig => {
  // Obter do localStorage se estiver definido
  const storedLocale = localStorage.getItem('currency-locale');
  if (storedLocale && currencyMap[storedLocale]) {
    return currencyMap[storedLocale];
  }
  
  // Detectar do navegador
  const browserLocale = navigator.language;
  
  // Verificar se temos uma correspondência exata
  if (currencyMap[browserLocale]) {
    return currencyMap[browserLocale];
  }
  
  // Verificar se temos uma correspondência parcial (apenas o idioma)
  const langCode = browserLocale.split('-')[0];
  const partialMatch = Object.keys(currencyMap).find(locale => locale.startsWith(langCode + '-'));
  
  if (partialMatch) {
    return currencyMap[partialMatch];
  }
  
  // Caso não encontre, retorna padrão (BRL)
  return currencyMap['pt-BR'];
};

// Formatar valor como moeda
export const formatCurrency = (value: number, localeOverride?: string): string => {
  const { currency, locale } = localeOverride && currencyMap[localeOverride] 
    ? currencyMap[localeOverride] 
    : getLocaleCurrency();
    
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(value);
};

// Definir moeda manualmente
export const setCurrencyLocale = (locale: string): void => {
  if (currencyMap[locale]) {
    localStorage.setItem('currency-locale', locale);
  }
};
