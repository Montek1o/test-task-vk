export const formatDate = (unixTime: string) => {
  const date = new Date(+unixTime * 1000);
  const formattedTime = date.toLocaleTimeString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });

  return formattedTime;
}