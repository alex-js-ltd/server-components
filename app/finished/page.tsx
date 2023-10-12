import ListItemList from '@/comps/list-item-list'

const Page = () => {
  return (
    <>
      <ListItemList filterListItems={li => Boolean(li.finishDate)} />
    </>
  )
}

export default Page
