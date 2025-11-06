export const metadata = {
  title: 'GLM Proxy',
  description: 'OpenAI-compatible proxy for GLM',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
