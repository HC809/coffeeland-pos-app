import moment from 'moment';
import 'moment/locale/es';

export const toShortDate = (date: Date) => {
  const auxDate = new Date(date);
  return moment(auxDate).format('DD/MM/YYYY');
};
