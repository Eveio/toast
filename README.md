# eve toast
eve's toast service for pop-up notifications, built on Vue. 
We support:
- [x] custom title / description of the toasts (of course 😆)
- [x] three different styles of toasts  ✅ ⚠️ ⭕
- [x] displaying the toasts in different corners of the interface:
  * top left
  * top right
  * top center 
  * bottom left
  * bottom right
  * bottom center
- [x] toasts that can be both manually closed, and self-closed after some duration
- [x] callback when a toast opens / closes

![example](example.png)

### Install
```
yarn add eve-toast
```

### Development
```
yarn serve
```
The playground is featured with two sections, one to queue new toasts with custom options, one is a log panel to show opened / closed toasts:
![dev playground](dev.png)

### Usage
The package comes with 4 exports that can be accessed with
    ```
    import { EveToastQueue, queueToast, EveToast, EveToastPosition } from 'eve-toast'
    ```
* `EveToastQueue`: the Vue component that renders a queue of toasts, can be registered and used like other custom components.
* `queueToast (toastOptions: EveToast): void`: the util to queue a toast.
* `EveToast`: as this project is built on TypeScript, we ship with an interface that makes type easier:
    ```
    interface EveToast {
      id?: string
      title?: string
      description?: string
      type: 'error' | 'warning' | 'success' // different styles of the toast
      position?: EveToastPosition // position of the toast
      duration?: number // life of a self-closing toast, in ms 
      onClose?: () => void // callback when the toast closes (manually or self-closed)
      onOpen?: () => void // callback when the toast opens
    }
    ```
  * `EveToastPosition`: 
  ```
  enum EveToastPosition {
    TopLeft = 'TOP_LEFT',
    TopCenter = 'TOP_CENTER',
    TopRight = 'TOP_RIGHT',
    BottomLeft = 'BOTTOM_LEFT',
    BottomCenter = 'BOTTOM_CENTER',
    BottomRight = 'BOTTOM_RIGHT',
  }
  ```

### Future support candidates:
- [ ] configurable styles / types of the toasts
- [x] more positions of the queue (top-left, bottom-right, etc.)
- [x] callbacks when a toast opens
- [ ] dark mode
- [ ] ...and more! Suggestion welcomed 😃

#### todos
- [x] setup dev page