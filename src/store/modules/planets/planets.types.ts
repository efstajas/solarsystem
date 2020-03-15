export interface PlanetCreationPayload {
  speed: number,
  orbitRadius: number,
  radius: number,
  tone: string,
}

export interface PlanetConfig extends PlanetCreationPayload {
  id: string;
}