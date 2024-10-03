import { Navbar } from '@/components/navbar'
import { MainBody } from '@/components/mainbody'
import { Footer } from '@/components/footer'
import { WavyBackground } from '@/components/ui/wavy-background'

export default function Home() {
    return (
        <div className='relative flex h-screen w-full flex-col bg-gray-50'>
            {/* WavyBackground will act as the absolute background */}
            <WavyBackground
                className='z-50'
                backgroundFill='#f9fafb'
                blur={1}
                speed='slow'
            />
            <div className='z-10 flex flex-grow flex-col justify-between'>
                <Navbar />
                <div className='z-10 flex-grow'>
                    <MainBody />
                </div>
                <Footer />
            </div>
        </div>
    )
}
