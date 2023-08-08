import { useCallback } from 'react'
import { StarsContainer } from './styles'
import { loadSlim } from 'tsparticles-slim'
import type {
  Container as ContainerParticles,
  Engine,
} from 'tsparticles-engine'
import Particles from 'react-tsparticles'

export default function Stars() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  const particlesLoaded = useCallback(
    async (container: ContainerParticles | undefined) => {
      await console.log(container)
    },
    [],
  )

  if (typeof window !== 'undefined') {
    window.addEventListener('resize', function () {
      const container = this.tsParticles.domItem(0)

      if (!container) {
        return
      }
      container.refresh()
    })
  }

  return (
    <StarsContainer>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: 'transparent',
            },
          },
          autoPlay: true,
          pauseOnBlur: true,
          pauseOnOutsideViewport: true,
          zLayers: 1,

          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: 'bubble',
                parallax: {
                  enable: true,
                  force: 30,
                },
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 40,
              },
              repulse: {
                distance: 300,
                duration: 0.4,
              },
              bubble: {
                distance: 500,
                duration: 3,
                opacity: 1,
                size: 2.5,
                speed: 1,
              },
            },
          },
          particles: {
            color: {
              value: '#ffffff',
            },
            links: {
              color: '#ffffff',
              distance: 150,
              enable: false,
              opacity: 0.5,
              width: 1,
            },
            move: {
              direction: 'none',
              enable: true,
              outModes: {
                default: 'none',
              },
              random: true,
              speed: 0.2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 1000,
              },
              value: 120,
            },
            opacity: {
              animation: {
                speed: 0.5,
                enable: true,
                opacity_min: 0.2,
              },
              value: 1,
            },
            shape: {
              type: 'circle',
              close: true,
            },
            size: {
              value: { min: 0.2, max: 1.5 },
            },
          },
        }}
      />
    </StarsContainer>
  )
}
