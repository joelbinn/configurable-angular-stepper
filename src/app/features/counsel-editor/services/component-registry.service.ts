import { Injectable, Type, ViewContainerRef } from '@angular/core'
import { CounselDetailId } from '../model/counsel.model'

/**
 * Service för att hantera mappning mellan rådsuppgift och Angular-komponent för rådsuppgiften.
 * Detta möjliggör dynamisk laddning av komponenter baserat på konfiguration.
 */
@Injectable({
  providedIn: 'root',
})
export class ComponentRegistryService {
  private registry: Partial<Record<CounselDetailId, Type<unknown>>> = {}

  /**
   * Registrerar en komponent för en specifik rådsuppgift.
   * @param counselDetailId ID för den rådsuppgift som denna komponent hanterar
   * @param component Komponentens Type
   */
  register(counselDetailId: CounselDetailId, component: Type<unknown>): void {
    this.registry[counselDetailId] = component;
  }

  /**
   * Hämtar en komponent för en specifik rådsuppgift.
   * @param counselDetailId ID för den rådsuppgift för komponenten att hämta
   * @returns Komponentens Type eller undefined om den inte finns
   */
  getComponent(counselDetailId: CounselDetailId): Optional<Type<unknown>> {
    return optionalOf(this.registry[counselDetailId]);
  }

  /**
   * Kontrollerar om en komponent är registrerad för angiven rådsuppgift
   * @param counselDetailId ID för den rådsuppgift för komponenten hanterar
   * * @returns true om komponenten är registrerad, annars false
   */
  hasComponent(counselDetailId: CounselDetailId): boolean {
    return counselDetailId in this.registry;
  }

  /**
   * Registrerar flera komponenter samtidigt
   * @param registry Objekt med componentId som nyckel och component som värde
   */
  registerBulk(registry: Partial<Record<CounselDetailId, Type<unknown>>>): void {
    this.registry = { ...this.registry, ...registry };
  }

  /**
   * Laddar en dynamisk komponent i containern
   */
  loadComponent(counselDetailId: CounselDetailId, containerRef: ViewContainerRef): void {
    const maybeComponent = this.getComponent(counselDetailId);

    if (maybeComponent.isEmpty) {
      throw new Error(`Component for counsel detail with ID "${counselDetailId}" was not found in registry`);
    } else {
      containerRef.clear();
      containerRef.createComponent(maybeComponent.get());
      console.log("Component for counsel detail with ID:",counselDetailId,"has been created");
    }
  }

}
