'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
const FeedbackManagementContent = () => (
    <Card>
      <CardHeader>
        <CardTitle>Feedback Management</CardTitle>
        <CardDescription>Overview of all feedback</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Feedback ID</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Form ID</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Comment</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>FB001</TableCell>
              <TableCell>John Doe</TableCell>
              <TableCell>F001</TableCell>
              <TableCell>4/5</TableCell>
              <TableCell>Great form, easy to use!</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>FB002</TableCell>
              <TableCell>Jane Smith</TableCell>
              <TableCell>F002</TableCell>
              <TableCell>3/5</TableCell>
              <TableCell>Could use more options</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>FB003</TableCell>
              
              <TableCell>Bob Johnson</TableCell>
              <TableCell>F003</TableCell>
              <TableCell>5/5</TableCell>
              <TableCell>Excellent design and functionality</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
  

  export default FeedbackManagementContent;