import React, { ComponentPropsWithoutRef, Ref, forwardRef } from 'react'

import { Spinner } from 'Components'

import styles from './Button.module.scss'

type Props = ComponentPropsWithoutRef<'button'> & {
  variant?: 'primary' | 'secondary' | 'text' | 'navGray' | 'navBlue'
  index?: number
  loading?: boolean
}

export const Button = forwardRef(
  (
    { variant = 'primary', index, className, disabled, loading, children, ...props }: Props,
    ref: Ref<HTMLButtonElement>
  ): JSX.Element => {
    return (
      <button
        disabled={disabled || loading}
        ref={ref}
        className={`${styles.button} ${
          disabled
            ? styles.disabled
            : styles[variant]
        } ${loading ? styles.loading : ''} ${className}`}
        {...props}
      >
        {loading ? <div className={styles.buttonSpinner}><Spinner /></div> : null}
        {children}
      </button>
    )
  }
)
