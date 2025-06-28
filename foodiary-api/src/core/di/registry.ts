import type { Constructor } from "@/core/types";

export class Registry {
  private readonly providers = new Map<string, Registry.Provider>();

  public register(impl: Constructor): void {
    const token = impl.name;

    if (this.providers.has(token)) {
      throw new Error(`Provider with token "${token}" is already registered`);
    }

    const deps = Reflect.getMetadata("design:paramtypes", impl) ?? [];

    this.providers.set(token, { impl, deps });
  }

  public resolve<T extends object>(impl: Constructor<T>): InstanceType<Constructor<T>> {
    const token = impl.name;
    const provider = this.providers.get(token) as Registry.Provider<T>;

    if (!provider) {
      throw new Error(`Provider with token "${token}" is not registered`);
    }

    const deps = provider.deps.map((dep: Constructor) => this.resolve(dep));

    return new provider.impl(...deps);
  }
}

export namespace Registry {
  export interface Provider<T extends object = object> {
    impl: Constructor<T>;
    deps: Constructor[];
  }
}
