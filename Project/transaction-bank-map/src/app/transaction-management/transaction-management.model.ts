export interface Transaction {
  id: number,
  name: string,
  totalUserPerDay: number,
  totalUserNow: number,
  createdDate: string,
  updatedDate: string,
}

export const sampleData = [
{
    id: 1,
    name: 'Transaction 1',
    totalUserPerDay: 100,
    totalUserNow: 50,
    createdDate: '2023-09-01T08:00:00Z',
    updatedDate: '2023-09-02T10:00:00Z',
  },
  {
    id: 2,
    name: 'Transaction 2',
    totalUserPerDay: 200,
    totalUserNow: 150,
    createdDate: '2023-09-03T09:00:00Z',
    updatedDate: '2023-09-04T11:30:00Z',
  },
  {
    id: 3,
    name: 'Transaction 3',
    totalUserPerDay: 300,
    totalUserNow: 250,
    createdDate: '2023-09-05T07:45:00Z',
    updatedDate: '2023-09-06T12:15:00Z',
  },
  {
    id: 4,
    name: 'Transaction 4',
    totalUserPerDay: 400,
    totalUserNow: 350,
    createdDate: '2023-09-07T08:30:00Z',
    updatedDate: '2023-09-08T13:00:00Z',
  },
  {
    id: 5,
    name: 'Transaction 5',
    totalUserPerDay: 500,
    totalUserNow: 450,
    createdDate: '2023-09-09T10:15:00Z',
    updatedDate: '2023-09-10T14:45:00Z',
  },
];
