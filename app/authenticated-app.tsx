import ListItemList from '@/comps/list-item-list'

const AuthenticatedApp = () => {
  return (
    <>
      <ListItemList filterListItems={li => !li.finishDate} />
    </>
  )
}

export default AuthenticatedApp
