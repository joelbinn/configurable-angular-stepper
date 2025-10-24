import { Injectable, Type } from '@angular/core';
import { IComponentRegistry } from '../models/step-config.model';

/**
 * Service för att hantera mappning mellan componentId och faktiska komponenter.
 * Detta möjliggör dynamisk laddning av komponenter baserat på konfiguration.
 */
@Injectable({
  providedIn: 'root',
})
export class ComponentRegistryService {
  private registry: IComponentRegistry = {};

  /**
   * Registrerar en komponent med ett unikt ID
   * @param componentId Unikt ID för komponenten
   * @param component Komponentens Type
   */
  register(componentId: string, component: Type<unknown>): void {
    this.registry[componentId] = component;
  }

  /**
   * Hämtar en komponent baserat på dess ID
   * @param componentId ID för komponenten att hämta
   * @returns Komponentens Type eller undefined om den inte finns
   */
  getComponent(componentId: string): Type<unknown> | undefined {
    return this.registry[componentId];
  }

  /**
   * Kontrollerar om en komponent är registrerad
   * @param componentId ID för komponenten att kontrollera
   * @returns true om komponenten är registrerad, annars false
   */
  hasComponent(componentId: string): boolean {
    return componentId in this.registry;
  }

  /**
   * Registrerar flera komponenter samtidigt
   * @param registry Objekt med componentId som nyckel och component som värde
   */
  registerBulk(registry: IComponentRegistry): void {
    this.registry = { ...this.registry, ...registry };
  }
}
