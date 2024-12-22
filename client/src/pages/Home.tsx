import { Link } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'
import { FiArrowRight } from 'react-icons/fi'

const Home = () => {
  const { user } = useAppSelector((state) => state.auth)

  const platforms = [
    {
      id: 1,
      title: 'UwuFufu',
      description: 'Anime ve manga dünyasına dalın! Favori karakterlerinizi keşfedin.',
      logo: '/images/logop.png',
      link: '/uwufufu',
      bgImage: '/images/kartbg.jpg',
      status: 'Aktif'
    },
    {
      id: 2,
      title: 'Kahve Molası',
      description: 'Sohbet edin, yeni arkadaşlar edinin ve keyifli vakit geçirin!',
      logo: '/images/logop.png',
      link: '#',
      bgImage: '/images/kartbg.jpg',
      status: 'Yakında'
    },
    {
      id: 3,
      title: 'Kod Dünyası',
      description: 'Kodlama öğrenin, projeler geliştirin ve deneyim kazanın!',
      logo: '/images/logop.png',
      link: '#',
      bgImage: '/images/kartbg.jpg',
      status: 'Yakında'
    },
    {
      id: 4,
      title: 'Dizi & Film',
      description: 'En sevdiğiniz içerikleri takip edin, öneriler alın ve tartışın!',
      logo: '/images/logop.png',
      link: '#',
      bgImage: '/images/kartbg.jpg',
      status: 'Yakında'
    }
  ]

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Platform Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {platforms.map((platform) => (
            <Link 
              key={platform.id} 
              to={platform.link}
              className="group relative pt-6 block"
            >
              <div className="platform-logo">
                <img 
                  src={platform.logo} 
                  alt={platform.title}
                  draggable="false"
                />
              </div>
              <div className="platform-card">
                <div className="platform-card-bg">
                  <img 
                    src={platform.bgImage} 
                    alt={platform.title}
                    loading="lazy"
                    draggable="false"
                  />
                </div>
                <div className="platform-card-content">
                  {/* Durum */}
                  <div className="flex justify-end mb-4">
                    <span className="platform-badge">
                      {platform.status}
                    </span>
                  </div>

                  {/* Açıklama */}
                  <p className="platform-description mb-6 flex-grow">
                    {platform.description}
                  </p>

                  {/* Git Butonu */}
                  <div className="platform-button">
                    <span className="text-lg font-medium">Keşfet</span>
                    <FiArrowRight className="w-5 h-5 ml-2 platform-arrow" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Giriş/Kayıt */}
        {!user && (
          <div className="mt-12">
            <div className="platform-card">
              <div className="platform-card-content flex flex-col md:flex-row items-center justify-between">
                <div className="text-center md:text-left mb-6 md:mb-0">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Hesap Oluştur
                  </h3>
                  <p className="text-white/80 max-w-xl">
                    Tüm platformlara erişim için ücretsiz hesap oluşturun.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/register" className="btn-primary">
                    Kayıt Ol
                  </Link>
                  <Link to="/login" className="btn-secondary">
                    Giriş Yap
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home 