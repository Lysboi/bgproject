import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  CircularProgress,
  Alert,
  useTheme,
  alpha,
  LinearProgress
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { getBattle, voteBattle, Battle } from '../services/battleService';

interface BattleOption {
  _id: string;
  title: string;
  image: string;
  selectCount: number;
}

interface Round {
  roundNumber: number;
  totalMatches: number;
  currentMatch: number;
  winners: BattleOption[];
  matches: Array<[BattleOption, BattleOption]>;
}

const PlayBattle: React.FC = () => {
  const theme = useTheme();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [battle, setBattle] = useState<Battle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentRound, setCurrentRound] = useState<Round | null>(null);

  // Turları oluştur
  const createRounds = (options: BattleOption[]) => {
    const shuffledOptions = [...options].sort(() => Math.random() - 0.5);
    const totalMatches = Math.floor(shuffledOptions.length / 2);
    const matches: Array<[BattleOption, BattleOption]> = [];

    for (let i = 0; i < totalMatches; i++) {
      matches.push([
        shuffledOptions[i * 2],
        shuffledOptions[i * 2 + 1]
      ]);
    }

    setCurrentRound({
      roundNumber: 1,
      totalMatches,
      currentMatch: 0,
      winners: [],
      matches
    });
  };

  // Kapışmayı yükle
  useEffect(() => {
    const loadBattle = async () => {
      try {
        setLoading(true);
        setError(null);
        if (!id) throw new Error('Kapışma ID\'si bulunamadı');
        
        const data = await getBattle(id);
        setBattle(data);
        createRounds(data.options);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadBattle();
  }, [id]);

  // Seçim yapma
  const handleSelect = async (winner: BattleOption) => {
    if (!currentRound || !battle) return;

    try {
      // Oyları kaydet
      await voteBattle(battle._id, winner._id);

      const newWinners = [...currentRound.winners, winner];
      const newCurrentMatch = currentRound.currentMatch + 1;

      // Eğer mevcut tur bittiyse
      if (newCurrentMatch === currentRound.totalMatches) {
        // Eğer kazanan sayısı 1'den fazlaysa yeni tur başlat
        if (newWinners.length > 1) {
          createRounds(newWinners);
        } else {
          // Oyun bitti
          setCurrentRound({
            ...currentRound,
            currentMatch: newCurrentMatch,
            winners: newWinners
          });
        }
      } else {
        // Tur devam ediyor
        setCurrentRound({
          ...currentRound,
          currentMatch: newCurrentMatch,
          winners: newWinners
        });
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !battle || !currentRound) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 4 }}>
          {error || 'Kapışma bulunamadı'}
        </Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(`/thisorthat/${id}`)}
        >
          Geri Dön
        </Button>
      </Container>
    );
  }

  // Eğer oyun bittiyse
  if (currentRound.winners.length === 1 && currentRound.currentMatch === currentRound.totalMatches) {
    const winner = currentRound.winners[0];
    return (
      <PageTransition>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h3" gutterBottom>
              Kazanan!
            </Typography>
          </Box>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card sx={{
              maxWidth: 600,
              mx: 'auto',
              background: alpha(theme.palette.success.main, 0.1),
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <CardMedia
                component="img"
                height="400"
                image={winner.image}
                alt={winner.title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  {winner.title}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 2 }}>
            <Button
              variant="outlined"
              onClick={() => navigate(`/thisorthat/${id}`)}
            >
              Detaylara Dön
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate('/thisorthat')}
            >
              Diğer Kapışmalara Göz At
            </Button>
          </Box>
        </Container>
      </PageTransition>
    );
  }

  const currentMatch = currentRound.matches[currentRound.currentMatch];

  return (
    <PageTransition>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(`/thisorthat/${id}`)}
            sx={{ mb: 2 }}
          >
            Geri Dön
          </Button>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h3" component="h1" gutterBottom>
              {battle.title}
            </Typography>
          </motion.div>
        </Box>

        {/* Tur Bilgisi */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            {currentRound.roundNumber}. TUR
          </Typography>
          <Typography variant="h5" color="text.secondary">
            {currentRound.currentMatch + 1}/{currentRound.totalMatches}
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={(currentRound.currentMatch / currentRound.totalMatches) * 100}
            sx={{ mt: 2, height: 8, borderRadius: 4 }}
          />
        </Box>

        {/* Seçenekler */}
        <Grid container spacing={3}>
          {currentMatch.map((option, index) => (
            <Grid item xs={12} md={6} key={option._id}>
              <motion.div
                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    background: 'rgba(30, 30, 30, 0.6)',
                    backdropFilter: 'blur(10px)',
                    border: index === 0 
                      ? '3px solid rgba(255, 50, 50, 0.8)' // Kırmızı taraf
                      : '3px solid rgba(50, 50, 255, 0.8)', // Mavi taraf
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: index === 0
                        ? '0 8px 24px rgba(255, 50, 50, 0.3)'
                        : '0 8px 24px rgba(50, 50, 255, 0.3)',
                      background: 'rgba(30, 30, 30, 0.8)',
                      borderColor: index === 0
                        ? 'rgba(255, 50, 50, 1)'
                        : 'rgba(50, 50, 255, 1)',
                    }
                  }}
                  onClick={() => handleSelect(option)}
                >
                  <CardMedia
                    component="img"
                    height="400"
                    image={option.image}
                    alt={option.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent>
                    <Typography variant="h5" align="center">
                      {option.title}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </PageTransition>
  );
};

export default PlayBattle; 