// 1240153142 - Татарин Мирослава
// 282039969 - Татарин Роман

// export const admins = [1240153142, 282039969];

// ctx.message.from.id === 1240153142 || ctx.message.from.id === 282039969;

export const adminRights = (contetxt) => {
  return (
    contetxt.message.from.id === 1240153142 ||
    contetxt.message.from.id === 282039969
  );
};
