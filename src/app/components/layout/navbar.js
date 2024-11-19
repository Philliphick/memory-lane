import Link from 'next/link';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link href="/" style={styles.navLink}>Home</Link>
        </li>
        <li style={styles.navItem}>
          <Link href="/about" style={styles.navLink}>About</Link>
        </li>
        <li style={styles.navItem}>
          <Link href="/services" style={styles.navLink}>Services</Link>
        </li>
        <li style={styles.navItem}>
          <Link href="/contact" style={styles.navLink}>Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#333',
    padding: '1rem',
    textAlign: 'center',
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'center',
    margin: 0,
    padding: 0,
  },
  navItem: {
    margin: '0 15px',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
    transition: 'color 0.3s ease',
  },
};

export default Navbar;
