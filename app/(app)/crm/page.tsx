export default function CRMPage() {
  return (
    <div style={{ padding: '40px', backgroundColor: '#0f2f48', color: '#fff', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '20px' }}>CRM KANBAN</h1>
      <p style={{ fontSize: '18px', marginBottom: '40px' }}>Gestão de pipeline de vendas</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' }}>
        <div style={{ border: '4px solid #f28933', padding: '20px', backgroundColor: '#1a3a52' }}>
          <p style={{ fontSize: '14px', color: '#aaa', marginBottom: '10px' }}>TOTAL DE CLIENTES</p>
          <p style={{ fontSize: '32px', fontWeight: 'bold' }}>8</p>
        </div>
        <div style={{ border: '4px solid #f28933', padding: '20px', backgroundColor: '#1a3a52' }}>
          <p style={{ fontSize: '14px', color: '#aaa', marginBottom: '10px' }}>CLIENTES ATIVOS</p>
          <p style={{ fontSize: '32px', fontWeight: 'bold' }}>5</p>
        </div>
        <div style={{ border: '4px solid #f28933', padding: '20px', backgroundColor: '#1a3a52' }}>
          <p style={{ fontSize: '14px', color: '#aaa', marginBottom: '10px' }}>PIPELINE</p>
          <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#f28933' }}>R$ 98K</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        {['LEADS', 'NEGOCIAÇÃO', 'CONTRATO', 'ATIVO'].map((phase, i) => (
          <div key={i}>
            <div style={{ backgroundColor: '#f28933', padding: '15px', marginBottom: '15px', fontWeight: 'bold' }}>
              {phase}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[1, 2].map((j) => (
                <div key={j} style={{ border: '4px solid #f28933', padding: '15px', backgroundColor: '#1a3a52' }}>
                  <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>Cliente {i * 2 + j}</p>
                  <p style={{ fontSize: '12px', color: '#aaa' }}>R$ {5 + i * 2}K</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
