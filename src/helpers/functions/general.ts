import moment from 'moment';
import 'moment/locale/es';

export const toShortDate = (date: Date) => {
  const auxDate = new Date(date);
  return moment(auxDate).format('DD/MM/YYYY');
};

export const hourFormat = (fecha: Date) => {
  let initDate = moment(fecha);

  return `${initDate.format('h:mm:ss a')}`;
};

export const formatNumber = (number: number) =>
  '' + number.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

export function formatLeadingZeros(number: number, many: number) {
  return ('0'.repeat(many) + number).slice(-many);
}
