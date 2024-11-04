import {ReactComponent as Logo} from '../../images/utip-logo.svg'

import styles from './Logo.module.css'

export const CompanyLogo = () => {
    return <div className={styles.LogoWrapper}> <Logo /> </div>
}