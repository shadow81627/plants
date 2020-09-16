/// <reference types='codeceptjs' />
type ResembleHelper = import('codeceptjs-resemblehelper')

declare namespace CodeceptJS {
  interface SupportObject {
    I: CodeceptJS.I
  }
  interface CallbackOrder {
    [0]: CodeceptJS.I
  }
  interface Methods extends CodeceptJS.Puppeteer, ResembleHelper {}
  interface I extends WithTranslation<Methods> {}
  namespace Translation {
    interface Actions {}
  }
}
