import React from 'react';
import Image from 'next/image';
import styles from '../app/styles/layout.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <Image
                src='/logo.svg'
                className={styles.logo}
                alt='logo'
                width={100}
                height={100}
            />
        </header>
    );
};

export default Header;
