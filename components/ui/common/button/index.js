const Button = ({
  children,
  className = 'text-white bg-indigo-600 hover:bg-indigo-700',
  ...rest
}) => {
  return (
    <span
      {...rest}
      onClick={connect}
      className={`px-8 py-3 border rounded-md text-base font-medium ${className}`}
    >
      {children}
    </span>
  )
}

export default Button
