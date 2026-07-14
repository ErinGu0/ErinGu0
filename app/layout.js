import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/next'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
})

export const metadata = {
  title: 'Erin Guo | Portfolio',
  description: 'Computer Science & Neuroscience @ University of Waterloo',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={jakarta.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}