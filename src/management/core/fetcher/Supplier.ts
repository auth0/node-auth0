export type SupplierContext = { scope: string[] | undefined };
export type SupplierFn<T> = (context?: SupplierContext) => T | Promise<T>;
export type Supplier<T> = T | Promise<T> | SupplierFn<T>;

export const Supplier = {
    // Marked context as optional to not have to update all snippets.
    get: async <T>(supplier: Supplier<T>, context?: SupplierContext): Promise<T> => {
        if (typeof supplier === "function") {
            return (supplier as SupplierFn<T>)(context);
        } else {
            return supplier;
        }
    },
};
