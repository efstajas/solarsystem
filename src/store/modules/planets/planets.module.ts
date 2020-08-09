import {
  Module,
  VuexModule,
  Mutation,
  Action,
} from 'vuex-module-decorators';
import { PlanetConfig, PlanetCreationPayload } from './planets.types';

const randomString = () => (
  Math.random().toString(36).substring(2, 15)
) + (
  Math.random().toString(36).substring(2, 15)
);

@Module({
  name: 'planets',
  namespaced: true,
})
export default class Planets extends VuexModule {
  currentPlanets: PlanetConfig[] = [{
    id: '2948abiuodbuaoiw',
    tone: 'C3',
    radius: 32,
    orbitRadius: 100,
    speed: 1.2,
  }];

  currentOrbitSizes: number[] = [100];

  get planets() {
    return this.currentPlanets;
  }

  get planet() {
    return (id: string) => this.currentPlanets.filter((p) => p.id === id)[0];
  }

  get orbitSizes() {
    return this.currentOrbitSizes;
  }

  @Mutation
  writePlanets(planets: PlanetConfig[]) {
    this.currentPlanets = planets;
    this.currentOrbitSizes = planets.map((p) => p.orbitRadius);
  }

  @Action({ commit: 'writePlanets' })
  addPlanet(planet: PlanetCreationPayload) {
    return [
      ...this.currentPlanets,
      {
        ...planet,
        id: randomString(),
      },
    ] as PlanetConfig[];
  }

  @Action({ commit: 'writePlanets' })
  removePlanet(planetId: string) {
    return this.currentPlanets.filter((p) => p.id !== planetId);
  }

  @Action({ commit: 'writePlanets' })
  updatePlanet(payload: {
    id: string;
    update: Partial<PlanetCreationPayload>;
  }) {
    const planet = this.currentPlanets.filter((p) => p.id === payload.id)[0];
    if (!planet) throw new Error('That planet doesnt exist');

    const planets = this.currentPlanets;
    const updatedPlanet = Object.assign(planets[planets.indexOf(planet)], payload.update);

    planets[planets.indexOf(planet)] = updatedPlanet;

    return planets;
  }
}
