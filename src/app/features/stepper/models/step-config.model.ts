import { Type } from '@angular/core'

/**
 * Konfiguration för substeg inom ett huvudsteg
 */
export interface ISubStep {
  /** Titel för substeget */
  title: string;

  /** Komponent-ID som används för att hitta rätt komponent att visa */
  componentId: string;
}

/**
 * Konfiguration för ett huvudsteg med möjliga substeg
 */
export interface IStep {
  /** Titel för huvudsteget */
  title: string;

  /** Lista av substeg som visas vertikalt */
  subSteps: ISubStep[];
}

/**
 * Huvudkonfiguration för hela stepper-strukturen
 */
export interface IStepConfig {
  /** Lista av huvudsteg som visas horisontellt */
  steps: IStep[];
}

/**
 * Registry-mapping mellan componentId och faktisk komponent
 */
export type IComponentRegistry = Record<string, Type<unknown>>;
