import Banner from '@/components/Home/Banner'
import ingredients from '../../ingredients.json'
import Recipies from '@/components/Home/Recipies'

export default function Home() {
  return (
    <main className="py-4">
      <Banner/>
      <Recipies/>
    </main>
  )
}
