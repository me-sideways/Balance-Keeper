import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

export const downloadCSV = async (logs) => {
  const headers = ['Substance', 'Amount', 'Time', 'Mood', 'Notes'];
  const csvRows = [headers];
  
  logs.forEach(log => {
    csvRows.push([log.substance, log.amount, log.time, log.mood, log.notes]);
  });
  
  const csvContent = csvRows.map(row => row.join(',')).join('\n');
  
  try {
    await Filesystem.writeFile({
      path: 'logs.csv',
      data: csvContent,
      directory: Directory.Documents,
      encoding: Encoding.UTF8
    });
    alert('CSV file saved to Documents folder');
  } catch (e) {
    console.error('Unable to save CSV file', e);
  }
};
