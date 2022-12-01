import Link from 'next/link'

export function Header() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '12px 5px',
      }}
    >
      <h1>Rdieta</h1>

      <span>
        <Link href={'/'}>Home</Link>
        {'  |  '}
        <Link href={'/diet'}>Dieta</Link>
      </span>
    </div>
  )
}
