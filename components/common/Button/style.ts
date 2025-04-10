const sizes = {
  button:
    'w-[109px] h-[32px] text-medium12 md:w-[72px] md:h-[30px] md:text-medium14 lg:w-[84px] lg:h-[32px] rounded-sm',

  auth: 'h-[50px] text-medium18 rounded-lg',
  modal: 'h-[54px] text-semi16 rounded-lg',
  modalAlert: 'h-[42px] text-semi14 md:h-[48px] md:text-semi16 rounded-lg',
  delete: 'w-[52px] h-[32px] text-medium12 md:w-[84px] md:text-medium14 rounded-sm',
  comment: 'w-[84px] h-[28px] text-medium12 md:w-[77px] md:h-[32px] lg:w-[83px] rounded-sm',
  addTodo: 'h-[32px] md:h-[40px] rounded-md',
  addColumn: 'w-[66px] sm:w-60 h-[66px] text-bold18 md:h-[70px] lg:w-[354px] rounded-lg',
  dashboardCard: 'h-[58px] text-semi14 md:h-[68px] md:text-semi16 lg:h-[70px] rounded-lg',
  deleteDashboard: 'h-[52px] text-medium16 md:w-[320px] md:h-[62px] md:text-medium18 rounded-lg',
};

const variants = {
  solid: 'bg-violet text-white disabled:bg-gray400',
  outline: 'bg-white border border-gray300',
  ghost: 'bg-white border border-gray300 text-violet',
};

export { sizes, variants };
