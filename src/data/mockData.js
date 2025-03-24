export const mockDashboardData = {
    metrics: {
      presentToday: {
        value: 247,
        percentage: 85,
        trend: 'increase',
        comparison: 'do total'
      },
      absentToday: {
        value: 44,
        percentage: 15,
        trend: 'decrease',
        comparison: 'do total'
      },
      averageStay: {
        value: '8.5h',
        trend: 'increase',
        comparison: '+30min vs. ontem'
      },
      hoursWorked: {
        value: '2100h',
        percentage: 98,
        trend: 'increase',
        comparison: 'do previsto'
      },
      delaysToday: {
        value: 12,
        percentage: 5,
        trend: 'decrease',
        comparison: 'do total',
        alert: true
      }
    },
    sectorAnalysis: {
      totalEmployees: 290,
      productivity: {
        value: '+12%',
        comparison: 'vs. média',
        trend: 'up'
      },
      departments: [
        { name: 'Administrativo', percentage: 40, color: 'brand.500' },
        { name: 'Saúde', percentage: 30, color: 'red.500' },
        { name: 'Operacional', percentage: 15, color: 'green.500' },
        { name: 'Suporte', percentage: 15, color: 'yellow.500' }
      ]
    },
    tendencyData: [
      { day: 'Seg', expected: 8, actual: 9 },
      { day: 'Ter', expected: 8, actual: 8.5 },
      { day: 'Qua', expected: 8, actual: 8.2 },
      { day: 'Qui', expected: 8, actual: 7.8 },
      { day: 'Sex', expected: 8, actual: 7.5 }
    ],
    recentActivities: [
      {
        id: 1,
        time: '09:45',
        name: 'Sara Silva',
        avatar: '/assets/images/employee1.jpg',
        type: 'Entrada',
        location: 'Portão Principal',
        status: 'ENTROU'
      },
      {
        id: 2,
        time: '09:30',
        name: 'Miguel Santos',
        avatar: '/assets/images/employee2.jpg',
        type: 'Saída',
        location: 'Saída Lateral',
        status: 'SAIU'
      },
      {
        id: 3,
        time: '09:15',
        name: 'João Oliveire',
        avatar: '/assets/images/employee3.jpg',
        type: 'Entrada',
        location: 'Garagem',
        status: 'ENTROU'
      }
    ]
  };