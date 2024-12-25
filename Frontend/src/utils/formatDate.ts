import { format } from 'date-fns';

const formatDate = (date: string) => {
  if (!date) {
    return;
  }
  const convertedDate = new Date(date);
  const formattedDate = format(convertedDate, "yyyy-MM-dd'T'HH:mm");
  return formattedDate;
};

export default formatDate;
