type Callback = (...args: any) => any;

export type DoubletResult<R> =
	| { error: Error; data: null }
	| { data: R; error: null };

type MaybeAsyncResult<R> = R extends Promise<infer U>
	? Promise<DoubletResult<U>>
	: DoubletResult<R>;

export default function doublet<TCallback extends Callback>(
	cb: TCallback,
	...args: Parameters<TCallback>
): MaybeAsyncResult<ReturnType<TCallback>> {
	try {
		const result = cb(...(args as Array<unknown>));

		if (result instanceof Promise) {
			return result
				.then((rx) => ({ error: null, data: rx }))
				.catch((error) => ({ error, data: null })) as MaybeAsyncResult<
				ReturnType<TCallback>
			>;
		}

		return { error: null, data: result } as MaybeAsyncResult<
			ReturnType<TCallback>
		>;
	} catch (error) {
		return { error, data: null } as MaybeAsyncResult<ReturnType<TCallback>>;
	}
}