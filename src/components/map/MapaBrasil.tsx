import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';
import type { AnoPainel } from '../../constants/cronologia';
import { obterTotalPorRegiaoPorAno } from '../../utils/dataUtils';
import {
  inferirSiglaUf,
  macroregiaoDaUf,
} from '../../utils/mapeamentoBrasil';

const FONTES_GEOJSON = [
  'https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson',
  '/brasil-estados.json',
] as const;

interface MapaBrasilProps {
  ano: AnoPainel;
  regiao: string | null;
}

/** GeoJSON mínimo aceito por react-simple-maps */
type ObjetoGeografia = {
  type: string;
  features?: unknown[];
};

const MapaBrasil: React.FC<MapaBrasilProps> = ({ ano, regiao }) => {
  const [indiceFonte, setIndiceFonte] = useState(0);
  const [geoJson, setGeoJson] = useState<ObjetoGeografia | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erroCompleto, setErroCompleto] = useState(false);

  const totaisPorMacro = useMemo(
    () => obterTotalPorRegiaoPorAno(ano),
    [ano]
  );

  const valorMaxRegiao = useMemo(
    () => Math.max(...Object.values(totaisPorMacro), 1),
    [totaisPorMacro]
  );

  const carregarFonte = useCallback(async (indice: number) => {
    if (indice >= FONTES_GEOJSON.length) {
      setErroCompleto(true);
      setCarregando(false);
      setGeoJson(null);
      return;
    }
    setCarregando(true);
    setErroCompleto(false);
    try {
      const res = await fetch(FONTES_GEOJSON[indice]);
      if (!res.ok) throw new Error(String(res.status));
      const json = (await res.json()) as ObjetoGeografia;
      setGeoJson(json);
      setIndiceFonte(indice);
    } catch {
      await carregarFonte(indice + 1);
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    void carregarFonte(0);
  }, [carregarFonte]);

  const corParaMacro = useCallback(
    (macro: string, intensidade: number): string => {
      const t = valorMaxRegiao > 0 ? intensidade / valorMaxRegiao : 0;
      const base: Record<string, string> = {
        NORTE: '33, 150, 243',
        NORDESTE: '255, 152, 0',
        'CENTRO-OESTE': '76, 175, 80',
        SUDESTE: '244, 67, 54',
        SUL: '156, 39, 176',
      };
      const rgb = base[macro] ?? '160, 160, 160';
      const alpha = 0.25 + t * 0.75;
      return `rgba(${rgb}, ${alpha})`;
    },
    [valorMaxRegiao]
  );

  const MapaFallbackRegioes = () => (
    <div className="mapa-fallback grid grid-cols-2 gap-3 w-full max-w-lg mx-auto">
      {Object.entries(totaisPorMacro).map(([nomeMacro, valor]) => {
        const destaque = !regiao || regiao === nomeMacro;
        const chip =
          {
            NORTE: 'bg-sky-600',
            NORDESTE: 'bg-amber-600',
            'CENTRO-OESTE': 'bg-emerald-600',
            SUDESTE: 'bg-rose-600',
            SUL: 'bg-violet-600',
          }[nomeMacro] ?? 'bg-stone-500';
        return (
          <div
            key={nomeMacro}
            className={`rounded-xl px-4 py-3 text-center text-white shadow-sm transition ${chip} ${
              destaque ? 'opacity-100 scale-[1.02]' : 'opacity-45'
            }`}
          >
            <div className="text-xs font-medium uppercase tracking-wide">
              {nomeMacro}
            </div>
            <div className="text-lg font-bold tabular-nums">
              {valor.toLocaleString('pt-BR')}
            </div>
          </div>
        );
      })}
    </div>
  );

  if (carregando && !geoJson && !erroCompleto) {
    return (
      <section className="painel-card p-5">
        <h2 className="text-lg font-semibold text-[var(--cor-texto)] mb-4 text-center">
          Mapa — {ano}
        </h2>
        <div className="h-[400px] flex items-center justify-center">
          <div className="text-center text-[var(--cor-texto-mudo)]">
            <div
              className="mx-auto mb-2 h-9 w-9 animate-spin rounded-full border-2 border-[var(--cor-acento)] border-t-transparent"
              aria-hidden
            />
            <p>Carregando geometrias…</p>
          </div>
        </div>
      </section>
    );
  }

  if (erroCompleto || !geoJson) {
    return (
      <section className="painel-card p-5">
        <h2 className="text-lg font-semibold text-[var(--cor-texto)] mb-4 text-center">
          Focos por macroregião — {ano}
        </h2>
        <div className="min-h-[320px] flex flex-col items-center justify-center rounded-xl bg-[var(--cor-fundo-suave)] p-6">
          <MapaFallbackRegioes />
          <p className="mt-4 text-center text-xs text-[var(--cor-texto-mudo)] max-w-md">
            Mapa vetorial indisponível; totais regionais consolidados do painel.
          </p>
        </div>
      </section>
    );
  }

  const geographyProp: ObjetoGeografia | string =
    geoJson.type === 'FeatureCollection' && geoJson.features?.length
      ? geoJson
      : FONTES_GEOJSON[indiceFonte];

  return (
    <section className="painel-card p-5">
      <h2 className="text-lg font-semibold text-[var(--cor-texto)] mb-4 text-center">
        Intensidade regional no mapa — {ano}
      </h2>
      <div className="h-[400px] text-[var(--cor-texto)]">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 700,
            center: [-52, -15],
          }}
        >
          <ZoomableGroup>
            <Geographies geography={geographyProp}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const props = (geo.properties ?? {}) as Record<
                    string,
                    unknown
                  >;
                  const sigla = inferirSiglaUf(props);
                  const macro = macroregiaoDaUf(sigla);
                  const visivel = !regiao || (macro && regiao === macro);
                  const intensidade = macro ? totaisPorMacro[macro] ?? 0 : 0;
                  const fill = visivel
                    ? corParaMacro(macro ?? '', intensidade)
                    : 'var(--cor-mapa-inativo)';

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={fill}
                      stroke="var(--cor-mapa-borda)"
                      strokeWidth={0.6}
                      style={{
                        default: { outline: 'none' },
                        hover: {
                          outline: 'none',
                          fill: visivel
                            ? 'var(--cor-mapa-hover)'
                            : 'var(--cor-mapa-inativo)',
                          cursor: visivel ? 'pointer' : 'default',
                        },
                        pressed: { outline: 'none' },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
      <p className="mt-3 text-center text-xs text-[var(--cor-texto-mudo)]">
        Opacidade proporcional ao volume de focos na macroregião (dados do
        painel).
      </p>
    </section>
  );
};

export default MapaBrasil;
