import { useEffect, useState } from "react";
import { BehaviorSubject } from "rxjs";

const useGlobal = <T>(data: BehaviorSubject<T>): T => {
  const [ value, setValue ] = useState<T>(data.getValue())

  useEffect(() => {
    // data.subscribe((nextValue: T) => setValue(nextValue))
    const subscription = data.subscribe(setValue)
    return () => subscription.unsubscribe()
  }, [])
  return value;
}

export default useGlobal

// const useGlobal = <T>(data: Observable<T>, initialValue: T): T => {
//   const [ value, setValue ] = useState<T>(initialValue)

//   useEffect(() => {
//     // data.subscribe((nextValue: T) => setValue(nextValue))
//     const subscription = data.subscribe(setValue)
//     return () => subscription.unsubscribe()
//   }, [])
//   return value;
// }

// export default useGlobal